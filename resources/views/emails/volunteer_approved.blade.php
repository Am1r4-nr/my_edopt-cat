<!DOCTYPE html>
<html>
<head><title>Welcome to the Atelier!</title></head>
<body>
    <h2>Congratulations, {{ $volunteer->user->name ?? 'Volunteer' }}!</h2>
    <p>Your application to become a Nurturer at e-Doptcat has been <strong>approved</strong>.</p>
    <p>We are thrilled to welcome you to the family. You can now log into your dashboard to start tracking your nurturing activity hours.</p>
    <p>Best Regards,<br>e-Doptcat Team</p>
</body>
</html>
