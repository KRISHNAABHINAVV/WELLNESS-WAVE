import { MOCK_COMMUNITY_PHONE_NUMBERS } from '../constants';

/**
 * Simulates sending a community-wide SMS alert via a backend service.
 * In a real-world application, this function would make a POST request
 * to a secure backend endpoint. The backend would then use a service like
 * Twilio to send the SMS messages to the registered phone numbers for that location.
 * 
 * @param location The geographical area to target.
 * @param message The content of the SMS alert.
 * @returns A promise that resolves with the number of people alerted.
 * @throws An error if the simulated backend service fails.
 */
export const sendSmsAlert = async (location: string, message: string): Promise<{ success: true; count: number }> => {
    console.log(`--- SIMULATING BACKEND API CALL ---`);
    console.log(`Endpoint: POST /api/send-sms`);
    console.log(`Payload: { location: "${location}", message: "${message}" }`);
    console.log(`Action: This would trigger a backend process using Twilio's API to message an entire community.`);
    
    // Simulate network latency of a real API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real backend, you would query your database for users in 'location'.
    // Here, we use our mock data to determine the population.
    const communitySize = MOCK_COMMUNITY_PHONE_NUMBERS[location] || Math.floor(Math.random() * 200) + 50;
    
    // Simulate a potential API failure (e.g., Twilio service is down)
    const isSuccess = Math.random() > 0.1; // 90% success rate for simulation

    if (isSuccess) {
        console.log(`--- SIMULATION SUCCESS ---`);
        console.log(`Backend confirms SMS queued for ${communitySize} recipients in ${location}.`);
        return { success: true, count: communitySize };
    } else {
        console.error(`--- SIMULATION FAILURE ---`);
        console.error(`Backend service failed to send SMS via Twilio.`);
        throw new Error('The SMS service is temporarily unavailable. Please try again later.');
    }
};
