const Role = require("../models/user_role.model");

const makeRole = async (req, res) => {
    const {role} = req.body;
    if (!role) {
      res.status(400).send({ message: "all fields are required" });
    }
  
    try {  
      const user = new Role({
        role
      });
  
      await user.save();
  
      res.status(200).send({ user });
    } catch (e) {
      console.error(e)
      res.status(500).send({ error: e });
    }
  };
  
  module.exports = {
    makeRole,
};