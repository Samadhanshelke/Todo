exports.passwordUpdated = (email, name,uuid) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;

            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                margin:0 auto;
                max-width: 200px;
                margin-bottom: 20px;
                font-size:22px;
                
               
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="logo">From Todo App</div>
            <div class="message">Password Update Link</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Your password reset link for the email  <span class="highlight">${email}</span> is.
                </p>
                <a href="https://todo-lovat-nine.vercel.app/reset-password/${uuid}">Click to reset password</a>
                <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
           
        </div>
    </body>
    
    </html>`
};