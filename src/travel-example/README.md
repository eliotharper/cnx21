# Usage Instructions

1. Create a new CloudPage code resource setting 'JSON' as the page type
2. Paste the code from controller.js on the code resource page
3. Update the `senderAddress` array with the email address(es) that you will be using to send the email
4. Update `s10` (in the URL on line 17) with your Marketing Cloud stack
5. Get the CloudPage identifier for the published page; refer to [this short video](https://youtu.be/OIy07ZreWws) for instructions
6. Open email.html and replace the `123` placeholder arguments in the CloudPagesURL function with the value from step 5 (there are two of these)
7. Paste the email in the AMP part of a supported AMP email in Marketing Cloud
8. Preview and test your email 