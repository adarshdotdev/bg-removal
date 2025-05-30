import User from '../models/userModel.js'

// API Controller Function to Manage Clerk User with database
// http://localhost:4000/api/user/webhooks

import { Webhook } from "svix"

const clerkWebhooks = async (req, res) => {

    try {
        // Create a svix instance with clertk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SERCRET)


        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body

        switch (type) {
            case "user.created": {

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await User.create(userData)

                res.json({})

                break;
            }
            case "user.updated": {



                const userData = {

                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await User.findOneAndUpdate({ clerkId: data.id }, userData)

                res.json({})

                break;
            }
            case "user.deleted": {

                await User.findOneAndDelete({ clerkId: data.id })

                res.json({})

                break;
            }

            default:
                break;

        }


    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.json({ success: false, message: error.message })

    }
}

// API Controller function to get user available credits data
const userCredits = async (req, res) => {
    try {
        const { clerkId } = req.body

        const user = await User.findOne({ clerkId })

        return res.json({ success: true, credits: user.creditBalance })

    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }
}


export { clerkWebhooks, userCredits }