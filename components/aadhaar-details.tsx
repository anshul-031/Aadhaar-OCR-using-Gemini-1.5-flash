import { AadhaarData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Users, Calendar, MapPin, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AadhaarDetailsProps {
  data: AadhaarData;
  className?: string;
}

export function AadhaarDetails({ data, className }: AadhaarDetailsProps) {
  if (!data) return null;

  const details = [
    { 
      label: 'Name',
      value: data.name,
      icon: <User className="h-4 w-4" />
    },
    { 
      label: "Father's Name",
      value: data.fatherName,
      icon: <Users className="h-4 w-4" />
    },
    { 
      label: 'Date of Birth',
      value: data.dateOfBirth,
      icon: <Calendar className="h-4 w-4" />
    },
    { 
      label: 'Gender',
      value: data.gender,
      icon: <User className="h-4 w-4" />
    },
    { 
      label: 'Aadhaar Number',
      value: data.aadhaarNumber,
      icon: <CreditCard className="h-4 w-4" />
    },
    { 
      label: 'Address',
      value: data.address,
      icon: <MapPin className="h-4 w-4" />
    },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Extracted Details</h2>
        <Badge variant="secondary">Verified</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map(({ label, value, icon }) => (
          <Card key={label} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                {icon}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-900">
                  {label === 'Aadhaar Number' 
                    ? value.replace(/(\d{4})/g, '$1 ').trim()
                    : value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}