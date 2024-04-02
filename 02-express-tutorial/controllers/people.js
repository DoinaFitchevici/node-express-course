const { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const addPerson = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  const newPerson = {
    id: people.length + 1,
    name: req.body.name,
  };
  people.push(newPerson);
  res.status(201).json({ success: true, name: req.body.name });
};

const getPerson = (req, res) => {
  const person = people.find((person) => person.id === parseInt(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  res.status(200).json({ success: true, data: person });
};

const updatePerson = (req, res) => {
  const { name } = req.body;
  const person = people.find((person) => person.id === parseInt(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: `no person with id ${req.params.id}` });
  }
  const updatedPeople = people.map((person) => {
    if (person.id === parseInt(req.params.id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: updatedPeople });
};

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === parseInt(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== parseInt(req.params.id)
  );
  return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  deletePerson,
};
