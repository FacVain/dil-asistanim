export const textTypes = [
  "Serbest Metin",
  "Dilekçe",
  "E-Posta (İş)",
  "E-Posta (Akademik)",
];

export const textTypesEnum = {
  "Serbest Metin": "freetexts",
  Dilekçe: "petitions",
  "E-Posta (İş)": "mails",
  "E-Posta (Akademik)": "mails",
};

export const textObjectStructureForQuery = {
  "Serbest Metin": {
    userInput: "",
    tone: "",
    type: "serbestYazi",
  },
  Dilekçe: {
    userInput: "",
    type: "dilekce",
  },
  "E-Posta (İş)": {
    userInput: "",
    type: "mail",
    mailType: "business",
  },
  "E-Posta (Akademik)": {
    userInput: "",
    type: "mail",
    mailType: "academic",
  },
};

export const toneEnums = {
  Mutlu: "Mutlu",
  Kızgın: "Kızgın",
  Şaşkın: "Sürpriz",
  Korkmuş: "Korku",
  Üzgün: "Üzgün",
};
