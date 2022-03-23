const Joi = require("joi")
const bcrypt = require("bcrypt")
const UserTable = require("../models/User")
const jwt = require('jsonwebtoken');
const createUser = async (req, res) => {
    const Schema = Joi.object({
        name: Joi.string().optional().allow('', null),
        email: Joi.string().email().required(),
        password: Joi.string().optional().allow('', null),
    });
    let validateSchema = Schema.validate(req.body);
    let sellerPayload;
    if (validateSchema.error) {
        return res.status(400).json({
            message: validateSchema.error.message || "Bad Request",
            status: 400
        })
    } else {

        userPayload = validateSchema.value;
    }
    console.log(userPayload, "nnnnnnnnnnnnnnnnnnnnnnnnnnn");

    // const userId = uuidv4();
    const payload = {
        ...userPayload,

    }
    try {
        const exists = await UserTable.findOne({
            where: {
                email: userPayload.email
            }
        })
        console.log(exists);
        if (exists) {
            console.log("fffffffffffffff");
            return res.status(422).send({
                message: "This user alreay exist please changes your phone number or username or email",
                status: 422,
            })
        } else {
            const encryptedPass = await bcrypt.hash(payload.password, 10);
            payload['password'] = encryptedPass;
            const result1 = await UserTable.create(payload)
            const token = await jwt.sign( result1.dataValues, process.env.SECRETE_KEY,   /* { expiresIn: 60 * 60 * 24 } */ )
            console.log(result1.dataValues, "result1");
            return res.status(200).send({
                message: "user added successfully!",
                token:token,
                status: 200,
                data: result1.dataValues
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }
}


const login = async (req, res) => {
    console.log("hello");
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    var validSchema = schema.validate(req.body);
    // validating payload
    if (validSchema.error) {
        return res.status(400).json({
            message: validSchema.error.message || "Bad Request",
            status: 400
        })
    } else {
        validSchema = validSchema.value;
    }
    try {
        // validating user
        const user = await UserTable.findOne({ where: { email: validSchema.email } })
        // console.log(user, "jjjjjjjjjj");
        if (!user) {
            return res.status(404).send({
                message: "Incorrect usernamne or password!",
                status: 404
            });
        }
        const token = await jwt.sign( user.dataValues, process.env.SECRETE_KEY,   /* { expiresIn: 60 * 60 * 24 } */ )
        // validating password
        const plainPass = await bcrypt.compare(validSchema.password, user.password);
        // console.log(plainPass, 'ddddddddddddd');
        if (!plainPass) {
            return res.status(404).send({
                message: "Incorrect usernamne or password!",
                status: 404
            });
        }
        return res.status(200).send({
            message: "Login successfull!",
            token:token,
            status: 200
        })
    } catch (error) {
        console.log('error in creating token', error)
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }
}

const getUser = async (req, res) => {
    try {
        const id=req.tokenData.userId
        const user = await UserTable.findOne({ where: {userId:id } })
        // console.log(user, "jjjjjjjjjj");
        if (!user) {
            return res.status(404).send({
                message: "user not exist!",
                status: 404
            });
        }
        return res.status(200).send({
            message: "Login successfull!",
            data:user,
            status: 200
        })
    } catch (error) {
        console.log('error in creating token', error)
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }

}

module.exports={createUser,login,getUser}

