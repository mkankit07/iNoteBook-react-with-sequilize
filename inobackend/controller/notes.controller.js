const Joi = require("joi")
const bcrypt = require("bcrypt")
const noteTable = require("../models/Note")
const jwt = require('jsonwebtoken');
const addNote = async (req, res) => {
    const Schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().optional().allow('', null),
        tags: Joi.string().optional().allow('', null),
    });
    let validateSchema = Schema.validate(req.body);
    let userPayload;
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
        const exists = await noteTable.findOne({
            where: {
                title: userPayload.title
            }
        })
        console.log(exists);
        if (exists) {
            console.log("fffffffffffffff");
            return res.status(422).send({
                message: "This title alreay ",
                status: 422,
            })
        } else {
            payload['userId'] = req.tokenData.userId
            const result1 = await noteTable.create(payload)
            console.log(result1.dataValues, "result1");
            return res.status(200).send({
                message: "user added successfully!",
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

const getNoteDetails = async (req, res) => {
    try {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        const exists = await noteTable.findAll({
            where: {
                userId: req.tokenData.userId
            }
        })
        console.log('///////////////////////////',req.tokenData.userId);
        console.log(exists);
        if (!exists) {
            console.log("fffffffffffffff");
            return res.status(404).send({
                message: "data not found ",
                status: 404,
            })
        } else {
            return res.status(200).send({
                message: "user added successfully!",
                status: 200,
                data: exists
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

const updateNote = async (req, res) => {
    const id=req.params.id
    const Schema = Joi.object({
        title: Joi.string(),
        description: Joi.string().optional().allow('', null),
        tags: Joi.string().optional().allow('', null),
    });
    let validateSchema = Schema.validate(req.body);
    let userPayload;
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
        const exists = await noteTable.update(payload,{ where: { noteId: req.params.id } })
        console.log(exists);
        if (exists == 0) {
            console.log("fffffffffffffff");
            return res.status(404).send({
                message: "This title alreay ",
                status: 404,
            })
        } else {
            return res.status(200).send({
                message: "update successfully!",
                status: 200,
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
const deleteNoteDetails = async (req, res) => {
    try {
        const exists = await noteTable.destroy({
            where: {
                noteId:req.params.id
            }
        })
        console.log("sdffsssssssssssssssssssddddddddddddddddddddddddddddddddsddd");
        console.log(exists);
        if (!exists) {
            console.log("fffffffffffffff");
            return res.status(404).send({
                message: "data not found ",
                status: 404,
            })
        } else {
            return res.status(200).send({
                message: "note delete successfully!",
                status: 200,
                data: exists
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

const getALlNoteDetailsByUse = async (req, res) => {
    try {
        const exists = await noteTable.findAll({
            where: {
                userId: req.tokenData.userId
            }
        })
        console.log(exists);
        if (!exists) {
            console.log("fffffffffffffff");
            return res.status(404).send({
                message: "data not found ",
                status: 404,
            })
        } else {
            return res.status(200).send({
                message: "user added successfully!",
                status: 200,
                data: exists
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

module.exports = { addNote, updateNote,getNoteDetails,deleteNoteDetails }