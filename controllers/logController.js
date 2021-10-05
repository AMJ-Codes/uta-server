const Express = require("express"); // Gateway to using Express methods.
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { LogModel } = require("../models");

// Create log
router.post("/create", validateJWT, async (req, res) => {
    const { title, definition, date, location } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        title,
        definition,
        date,
        location,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err })
    }
    // LogModel.create(logEntry)
});

// Get all logs
router.get("/all", validateJWT, async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get logs by user_id
router.get("/all/:id", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLog = await LogModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLog);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

// Update a log
router.put("/update/:id", validateJWT, async (req, res) => {
    const { title, definition, date, location } = req.body.journal;
    const logId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    };

    const updatedLog = {
        title: title, 
        definition: definition,
        date: date,
        location: location
    };

    try {
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

// Delete a log
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner_id: ownerId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({ message: "Comment Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;