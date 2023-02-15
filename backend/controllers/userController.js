// import userModel here

const loginUser = async (req, res) => {
    console.log('logging in');
    res.send('Logging in');
}

const signupUser = async (req, res) => {
    console.log('signing up');
    res.send('Signing up')
}

module.exports = {
    loginUser,
    signupUser
}