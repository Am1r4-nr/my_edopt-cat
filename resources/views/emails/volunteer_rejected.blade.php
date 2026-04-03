<!DOCTYPE html>
<html>
<head><title>Update on your Application</title></head>
<body>
    <h2>Hello {{ $volunteer->user->name ?? 'Applicant' }},</h2>
    <p>Thank you for applying to be a part of the e-Doptcat community.</p>
    <p>Unfortunately, we are unable to proceed with your application at this time.</p>
    @if($reason)
        <p><strong>Reason:</strong> {{ $reason }}</p>
    @endif
    <p>We appreciate your interest and wish you the best in your future endeavors.</p>
    <p>Best Regards,<br>e-Doptcat Team</p>
</body>
</html>
