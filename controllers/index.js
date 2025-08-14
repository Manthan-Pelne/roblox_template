export const getIndex = async (req, res) => {
  try {
    res.render("index", {
      location: null,
      error: null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
