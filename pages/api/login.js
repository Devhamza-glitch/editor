// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const Ul_id = req?.body?.Ul_id?.trim?.();
    const password = req?.body?.password?.trim?.();
    if (Ul_id && password) {
      let adminData = {
        Ul_id: "89092906",
        password: "1234",
      };

      if (Ul_id === adminData.Ul_id && password === adminData.password) {
        res.status(200).send({
          success: true,
          message: "Logged in successfully",
        });
      } else {
        res
          .status(400)
          .send({
            success: false,
            message: "Please enter correct credentials.",
          });
      }
    } else {
      res.status(404).send({ success: false, message: "send proper data." });
    }
  } catch (err) {
    console.log("error", err);
    res.status(503).send({ success: false, message: "Server Error." });
  }
};
