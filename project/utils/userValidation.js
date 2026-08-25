 export  async function validateUser(user, functionName,phone=false,res) {
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: phone===false ? "Unable to send the password reset email. Please try again later.":"Unable to send OTP. Please try again later."
                })
            }
            else {
                await functionName(user);
                return res.status(200).json({
                    success: true,
                    message: phone===false ? "If an account with that email exists, a password reset link has been sent":"If an account with this phone number exists. An OTP has been sent",
                // OTPdata
                })
            }
        } 