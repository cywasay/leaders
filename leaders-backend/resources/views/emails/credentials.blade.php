<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Account Credentials</title>
    <style>
        body { font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background-color: #2d2d2d; border-radius: 24px; padding: 40px; border: 1px solid rgba(255, 255, 255, 0.05); text-align: center; }
        .logo { font-size: 24px; font-weight: 800; color: #3EC6EC; margin-bottom: 30px; letter-spacing: 1px; }
        h1 { font-size: 28px; font-weight: 700; margin-bottom: 10px; color: #ffffff; }
        p { font-size: 16px; line-height: 1.6; color: #a0a0a0; margin-bottom: 30px; }
        .credentials-box { background-color: rgba(62, 198, 236, 0.1); border-radius: 16px; padding: 30px; margin-bottom: 30px; border: 1px solid rgba(62, 198, 236, 0.2); }
        .credential-item { margin-bottom: 15px; text-align: left; }
        .credential-item:last-child { margin-bottom: 0; }
        .label { font-size: 12px; font-weight: 700; color: #3EC6EC; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; display: block; }
        .value { font-size: 18px; font-weight: 600; color: #ffffff; word-break: break-all; }
        .btn { display: inline-block; background-color: #3EC6EC; color: #000000; font-weight: 700; text-decoration: none; padding: 18px 40px; border-radius: 12px; font-size: 16px; transition: background-color 0.3s; margin-top: 10px; }
        .footer { margin-top: 30px; font-size: 12px; color: #666666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="logo">LEADERS</div>
            <h1>Welcome to the Platform</h1>
            <p>Your professional admin account has been prepared. Use the specialized credentials below to access your dashboard.</p>
            
            <div class="credentials-box">
                <div class="credential-item">
                    <span class="label">Email Address</span>
                    <div class="value">{{ $user->email }}</div>
                </div>
                <div class="credential-item">
                    <span class="label">Temporary Password</span>
                    <div class="value">{{ $password }}</div>
                </div>
            </div>

            <p style="font-size: 14px; color: #888;">For security reasons, we recommend updating your password after your first login.</p>
            
            <a href="http://localhost:3000/admin/login" class="btn">Access Dashboard</a>
            
            <div class="footer">
                &copy; {{ date('Y') }} Leaders Platform. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
