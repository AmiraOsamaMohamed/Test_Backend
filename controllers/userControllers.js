import User from "../mongodb/models/user.js";


const signUp = async (req, res) => {
    try {
        const { email, password, phone } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(200).json(userExists);

        const newUser = await User.create({
            email,
            password,
            phone,
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logIn = async (req, res) => {
    try {
        const { email, password } = req.params;

        const user = await User.findOne({ email: email }, { password: password }).populate("allProperties");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { signUp, logIn };