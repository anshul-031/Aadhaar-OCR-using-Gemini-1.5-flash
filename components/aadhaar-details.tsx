'use client';

import { AadhaarData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Users, Calendar, MapPin, CreditCard, Building, MapPinned } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface AadhaarDetailsProps {
  data: AadhaarData | null;
  className?: string;
}

export function AadhaarDetails({ data, className }: AadhaarDetailsProps) {
  const details = useMemo(() => {
    if (!data) return [];
    
    return [
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
        label: 'Full Address',
        value: data.address,
        icon: <MapPin className="h-4 w-4" />
      },
      {
        label: 'District',
        value: data.addressComponents.district,
        icon: <Building className="h-4 w-4" />
      },
      {
        label: 'State',
        value: data.addressComponents.state,
        icon: <MapPinned className="h-4 w-4" />
      },
      {
        label: 'PIN Code',
        value: data.addressComponents.pinCode,
        icon: <MapPin className="h-4 w-4" />
      }
    ];
  }, [data]);

  if (!data || details.length === 0) return null;

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
                  {label === 'Aadhaar Number' && value 
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