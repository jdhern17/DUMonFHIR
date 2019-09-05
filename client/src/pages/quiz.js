export const quiz = {
  quizTitle: "Interface Knowledge Assessment",
  quizSynopsis:
    "To make sure your team is up to speed on FHIR, you should first get a quick background on how we got here!",
  questions: [
    {
      question:
        "Which of the following interface messaging types is divided by pipes (|)?",
      questionType: "text",
      answers: ["HL7v2", "HL7v3", "835/837", "CCDA"],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct answer! HealthLevel 7 Version 2.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Here is an example of an HL7v2 Message Header: MSH|^~&|GHH LAB|ELAB-3|GHH OE|BLDG4|200202150930||ORU^R01|CNTRL-3456|P|2.4"
    },
    {
      question: "Which message type was invented first?",
      questionType: "text",
      answers: ["CCDA", "ORU"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "ORU is an HL7v2 message type whereas CCDA is an HL7v3 message type."
    },
    // {
    //   question: "ReactJS is an MVC based framework?",
    //   questionType: "text",
    //   answers: ["True", "False"],
    //   correctAnswer: "2",
    //   messageForCorrectAnswer: "Correct answer. Good job.",
    //   messageForIncorrectAnswer: "Incorrect answer. Please try again.",
    //   explanation:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    // },
    // {
    //   question: "Which of the following concepts is/are key to ReactJS?",
    //   questionType: "text",
    //   answers: [
    //     "Component-oriented design",
    //     "Event delegation model",
    //     "Both of the above"
    //   ],
    //   correctAnswer: "3",
    //   messageForCorrectAnswer: "Correct answer. Good job.",
    //   messageForIncorrectAnswer: "Incorrect answer. Please try again.",
    //   explanation:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    // },
    {
      question: "Which of the following is an example of a CCDA?",
      questionType: "photo",
      answers: [
        "https://i.postimg.cc/DwDSDgXD/x12.png",
        "https://i.postimg.cc/3wvkHvjw/hl7v2.png",
        "https://i.postimg.cc/cHGr1LTB/xml.png"
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation: "CCDAs are clinical messages written in xml"
    }
  ]
};
