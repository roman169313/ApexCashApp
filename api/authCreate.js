import auth from "./auth";
const authCreate = async (navigation,fullName,email,password,phoneNo) => {
    try {
      const response = await fetch('https://app.apexcardservice.com/user.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
          phoneNo: phoneNo,
        }),
      });
console.log(response);
      if (response.ok) {
        auth(navigation,email,password);
      } else {
        // Handle signup failure
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  export default authCreate;