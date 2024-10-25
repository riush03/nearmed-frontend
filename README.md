# NearMed

Revolutionizing healthcare with NEAR blockchain - A decentralized healthcare platform connecting patients with doctors and pharmacies.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-NEAR-blue.svg)
![Stage](https://img.shields.io/badge/stage-testnet-yellow.svg)

**Smart Contract (backend):** [**places-near-smart-contract**](https://github.com/wpdas/places-near-smart-contract) built using **Rust** on the [**NEAR Network**](https://near.org/blockchain).

Access the live dapp here:

- [**Places DApp (mainnet)**](https://places-dapp-near.vercel.app/)
- [**Places DApp (testnet)**](https://places-dapp-near-testnet.vercel.app/)

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or later
- Rust 1.64 or later
- NEAR CLI
- A NEAR testnet account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nearmed.git
cd nearmed
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install contract dependencies
cd ../contract
cargo build
```

3. Configure environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Deploy smart contract
```bash
near deploy --accountId your-testnet-account.testnet --wasmFile target/wasm32-unknown-unknown/release/nearmed.wasm
```

5. Start development server
```bash
cd frontend
npm run dev
```

## 🏗️ Architecture

### Frontend (Next.js)
- `/pages` - Route components
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/utils` - Helper functions
- `/context` - React context providers
- `/styles` - CSS and styling files

### Smart Contract (Rust)
- `/contract/src/lib.rs` - Main contract logic
- `/contract/src/models` - Data structures
- `/contract/src/views` - View methods
- `/contract/src/actions` - Call methods

## 📝 API Reference

### Smart Contract Methods

#### User Management
```rust
register_doctor(credentials: DoctorCredentials) -> Promise
register_patient(credentials: PatientCredentials) -> Promise
approve_doctor(doctor_id: AccountId) -> Promise
```

#### Appointments
```rust
book_appointment(doctor_id: AccountId, details: AppointmentDetails) -> Promise
complete_appointment(appointment_id: AppointmentId) -> Promise
```

#### Prescriptions
```rust
create_prescription(patient_id: AccountId, details: PrescriptionDetails) -> Promise
fulfill_prescription(prescription_id: PrescriptionId) -> Promise
```

### Frontend APIs

#### Authentication
```typescript
login(): Promise<void>
logout(): Promise<void>
```

#### Healthcare
```typescript
bookAppointment(doctorId: string, details: AppointmentDetails): Promise<Appointment>
getPrescriptions(): Promise<Prescription[]>
orderMedicine(prescriptionId: string): Promise<Order>
```

## 🔒 Security

- All smart contracts are audited for security vulnerabilities
- Medical data is encrypted before storage
- Role-based access control implementation
- Regular security updates and patches

## 🧪 Testing

### Smart Contract Tests
```bash
cd contract
cargo test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Team

- Developer - [Your Name](https://github.com/yourusername)
- Designer - [Designer Name](https://github.com/designerusername)
- Product Manager - [PM Name](https://github.com/pmusername)

## 🙏 Acknowledgments

- NEAR Protocol team
- OpenAI for AI integration
- All our beta testers and early adopters

## 📞 Contact

Project Link: [https://github.com/yourusername/nearmed](https://github.com/yourusername/nearmed)

## 🚨 Support

For support, email support@nearmed.com or join our Discord channel.
