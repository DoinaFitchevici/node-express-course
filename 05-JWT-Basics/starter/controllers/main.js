const login = async (req, res) => {
  res.send("Fake login/Register/Signup route");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({
      msg: `Hello. Doina F`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
};

module.exports = {
  login,
  dashboard,
};
