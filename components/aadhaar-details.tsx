import { AadhaarData } from '@/lib/types';

interface AadhaarDetailsProps {
  data: AadhaarData;
}

export function AadhaarDetails({ data }: AadhaarDetailsProps) {
  const details = [
    { label: 'Name', value: data.name },
    { label: "Father's Name", value: data.fatherName },
    { label: 'Date of Birth', value: data.dateOfBirth },
    { label: 'Gender', value: data.gender },
    { label: 'Aadhaar Number', value: data.aadhaarNumber },
    { label: 'Address', value: data.address },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Extracted Details</h2>
      <div className="grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded-lg">
        {details.map(({ label, value }) => (
          <div key={label} className="space-y-1">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}