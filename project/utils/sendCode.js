import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
	path: path.join(__dirname, "../../.env")
});

export async function sendSMS(phone, otp) {
// const url = 'https://messagebird-sms-gateway.p.rapidapi.com/sms?username=TopCoder';
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'x-rapidapi-key': process.env.RAPIDAPI_KEY,
// 		'x-rapidapi-host': process.env.RAPIDAPI_HOST,
// 		'Content-Type': 'application/x-www-form-urlencoded'
// 	},
// 	body: new URLSearchParams({
// 		sender: 'MessageBird',
// 		body: `Your verification code is: ${otp}`,
// 		destination: phone,
// 		// reference: '268431687',
// 		// timestamp: '201308020025',
// 		// replacechars: 'checked',
// 		// type: 'normal',
// 		// udh: undefined,
// 		// test: undefined,
// 		// dlr_url: 'http://www.example.com/dlr-messagebird.php'
// 	})
// };
// const url = 'https://inteltech.p.rapidapi.com/credit.php';
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'x-rapidapi-key': 'd347ea0275mshde6afdce1672f1ep100f13jsnf46b51bb675e',
// 		'x-rapidapi-host': 'inteltech.p.rapidapi.com',
// 		'Content-Type': 'application/x-www-form-urlencoded'
// 	},
// 	body: new URLSearchParams({
// 		username: 'temp-idk-test-dynamic',
// 		key: '1B490066-EA03-E39A-A18C-C4868E45CFAE'
// 	})
// };


try {
	console.log(`SMS sent to: ${phone}
Your verification code is: ${otp}`);
} catch (error) {
	console.error(error);
}
}