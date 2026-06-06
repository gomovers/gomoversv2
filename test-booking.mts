import { createBooking } from './src/server/createBooking.ts';

try {
  const result = await createBooking({ 
    data: {
      service: 'local',
      origin: 'Mermaid Beach',
      destination: 'Broadbeach',
      size: '2 Bedrooms',
      preferred_date: '2026-06-20',
      name: 'Test Live Secrets',
      phone: '0400 000 000',
      email: 'test@gomovers.com.au'
    }
  });
  console.log('SUCCESS:', JSON.stringify(result));
} catch (e) {
  console.error('ERROR:', e.message);
}
