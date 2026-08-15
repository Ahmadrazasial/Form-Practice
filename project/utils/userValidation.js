 export  async function validateUser(user, functionName,msg,res) {
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: msg || "Unable to send the password reset email. Please try again later."
                })
            }
            else {
                await functionName(user);
                return res.status(200).json({
                    success: true,
                    message: msg || "If an account with that email exists, a password reset link has been sent",
                // OTPdata
                })
            }
        } 