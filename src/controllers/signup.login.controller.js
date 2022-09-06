const { Users } = require('../models/userSignup.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupSuccess, passwordNotMatch, invalidEmailPassword } = require('../middleware/message');

//------------------------------------------------------------------------------------------------------------------//

const signup = async (req, res) => {
    if (req.body.password === req.body.confirmPassword) {
        async function createUser() {
            const user = new Users({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            });
            await user.save();
        }
        await createUser().then(r => res.send(signupSuccess)).catch(err => res.status(400).send(err.message));
    }
    else {
        const err = new Error(passwordNotMatch);
        console.log(err.message);
        res.status(400).send(err.message);
    }
    res.end();
}

//------------------------------------------------------------------------------------------------------------------//

const login = async (req, res) => {
    const user = await Users.findOne({ email: req.query.email });

    if (!user) {
        return res.status(401).send(invalidEmailPassword);
    }

    if (! await bcrypt.compare(req.query.password, user.password)) {
        return res.status(401).send(invalidEmailPassword);
    }

    const token = jwt.sign({ _id: user._id }, 'klgjs');
    res.header('auth-token', token).send(token);
}

//------------------------------------------------------------------------------------------------------------------//

module.exports = { signup, login };