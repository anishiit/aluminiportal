import { atom } from "recoil";

const authScreenAtom = atom({
	key: "authScreenAtom",
	default: "signin",
});

export default authScreenAtom;