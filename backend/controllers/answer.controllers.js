const Answer = require('../models/answer.model');

const saveAnswer = async (req, res) => {
  try {
    const { userId, responses } = req.body;
    const savedResponses = await Promise.all(
      responses.map(async (response) => {
        const { questionId, text } = response;

        if (!questionId || !text) {
          return res.status(400).json({ success: false, error: 'Invalid response format' });
        }

        try {
          const savedResponse = await Answer.create({
            userId,
            questionId,
            text,
          });

          return savedResponse;
        } catch (error) {
          console.error('Error saving response to the database', error);
        }
      })
    );

    res.status(200).json({ success: true, savedResponses });
  } catch (error) {
    res.status(500).json({ success: false, 
                            error: `Internal Server Error: ${error.message}` });
  }
};

module.exports = {
  saveAnswer,
};
