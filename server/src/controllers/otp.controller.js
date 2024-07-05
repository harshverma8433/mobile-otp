import Otp from "../models/otp.model.js";
import dotenv from "dotenv";
import otpGenerator from 'otp-generator';
import twilio from 'twilio';

// Load environment variables
dotenv.config({ path: './.env' });

console.log(process.env.TWILIO_Account_SID);

const accountSid = process.env.TWILIO_Account_SID;
const authToken = process.env.TWILIO_Auth_Token;
const twilioClient = new twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
    try {
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        const { phoneNumber } = req.body;
        const currentDate = new Date();

        // Save OTP and expiration
        await Otp.findOneAndUpdate(
            { phoneNumber },
            { otp, otpExpiration: new Date(currentDate.getTime()) },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Send OTP using Twilio
        await twilioClient.messages.create({
            body: `Your Otp is: ${otp}`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        return res.status(200).json({
            status: true,
            message: `Otp Sent Successfully: ${otp}`
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        const otpData = await Otp.findOne({ phoneNumber, otp });

        if (!otpData) {
            return res.status(400).json({
                status: false,
                message: "Otp is Incorrect!"
            });
        }

        const otpTime = otpData.otpExpiration.getTime();
        const currentDate = new Date().getTime();

        const diffInMinutes = Math.abs((otpTime - currentDate) / (1000 * 60));

        if (diffInMinutes > 2) {
            return res.status(400).json({
                status: false,
                message: "Your Otp Has Expired!"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Otp Verified Successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

export default { sendOtp, verifyOtp };
