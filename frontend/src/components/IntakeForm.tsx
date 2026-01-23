import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { intakeFormSchema, type IntakeFormData, type ReturnFormData, type ComplaintFormData } from '../lib/schemas';
import { useState } from 'react';
import { FileUploader } from './FileUploader';
import { Lock, Calendar } from 'lucide-react';

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData, conversationId: string) => void;
  onError: (message: string) => void;
}

export function IntakeForm({ onSubmit, onError }: IntakeFormProps) {
  const [requestType, setRequestType] = useState<'RETURN' | 'COMPLAINT'>('RETURN');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      requestType: 'RETURN',
      unused: false,
    },
  });

  const watchedImages = watch('images');

  const handleRequestTypeChange = (type: 'RETURN' | 'COMPLAINT') => {
    setRequestType(type);
    setValue('requestType', type);
    if (type === 'RETURN') {
      reset({
        requestType: 'RETURN' as const,
        orderReceiptId: '',
        purchaseDate: '',
        unused: false,
        images: [],
      });
    } else {
      reset({
        requestType: 'COMPLAINT' as const,
        orderReceiptId: '',
        purchaseDate: '',
        defectDescription: '',
        images: [],
      });
    }
  };

  const handleFileChange = (files: File[]) => {
    setValue('images', files, { shouldValidate: true });
  };

  const onSubmitForm = async (data: IntakeFormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('requestType', data.requestType);
      formData.append('orderReceiptId', data.orderReceiptId);
      formData.append('purchaseDate', data.purchaseDate);
      
      if (data.requestType === 'RETURN') {
        formData.append('unused', String(data.unused));
      } else {
        formData.append('defectDescription', data.defectDescription);
      }
      
      data.images.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch('/api/returns/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'REJECTED') {
        onError(result.message);
        setIsSubmitting(false);
        return;
      }

      onSubmit(data, result.conversationId);
    } catch (error) {
      onError('Failed to submit request. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Request Type Selection - Sinsay Style */}
      <div>
        <label className="block text-sm md:text-base font-medium mb-3 text-[#1E293B]">
          Request Type
        </label>
        <div className="relative bg-[#F1F5F9] rounded-full p-1 flex gap-1">
          <button
            type="button"
            onClick={() => handleRequestTypeChange('RETURN')}
            className={`
              relative z-10 flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-200 ease-in-out text-sm md:text-base
              ${requestType === 'RETURN'
                ? 'bg-white text-[#1E293B] font-medium shadow-sm'
                : 'bg-transparent text-[#64748B] font-normal hover:text-[#1E293B]'}
            `}
          >
            Return (30-day policy)
          </button>
          <button
            type="button"
            onClick={() => handleRequestTypeChange('COMPLAINT')}
            className={`
              relative z-10 flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-200 ease-in-out text-sm md:text-base
              ${requestType === 'COMPLAINT'
                ? 'bg-white text-[#1E293B] font-medium shadow-sm'
                : 'bg-transparent text-[#64748B] font-normal hover:text-[#1E293B]'}
            `}
          >
            Complaint (2-year warranty)
          </button>
        </div>
      </div>

      {/* Order/Receipt ID - Sinsay Style */}
      <div>
        <label className="block text-sm md:text-base font-medium mb-2 text-[#1E293B]">
          Order/Receipt ID *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#3B82F6]" />
          <input
            type="text"
            {...register('orderReceiptId')}
            className="w-full h-11 md:h-12 pl-10 md:pl-12 pr-4 py-3 sinsay-input text-[#1E293B] placeholder:text-[#94A3B8] text-sm md:text-base"
            placeholder="Enter your order or receipt ID"
          />
        </div>
        {errors.orderReceiptId && (
          <p className="text-[#DC2626] text-xs md:text-sm mt-1.5">
            {errors.orderReceiptId.message}
          </p>
        )}
      </div>

      {/* Purchase Date - Sinsay Style */}
      <div>
        <label className="block text-sm md:text-base font-medium mb-2 text-[#1E293B]">
          Purchase Date *
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#3B82F6]" />
          <input
            type="date"
            {...register('purchaseDate')}
            className="w-full h-11 md:h-12 pl-10 md:pl-12 pr-4 py-3 sinsay-input text-[#1E293B] placeholder:text-[#94A3B8] text-sm md:text-base"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <p className="text-xs text-[#64748B] mt-1.5">Format: YYYY-MM-DD</p>
        {errors.purchaseDate && (
          <p className="text-[#DC2626] text-xs md:text-sm mt-1.5">
            {errors.purchaseDate.message}
          </p>
        )}
      </div>

      {/* Return-specific: Unused checkbox - Sinsay Style */}
      {requestType === 'RETURN' && (
        <div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('unused')}
              className="w-4 h-4 md:w-5 md:h-5 rounded border-2 border-[#E2E8F0] text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm md:text-base text-[#1E293B] group-hover:text-[#3B82F6] transition-colors">
              I confirm the item is unused *
            </span>
          </label>
          {(errors as FieldErrors<ReturnFormData>).unused && (
            <p className="text-[#DC2626] text-xs md:text-sm mt-1.5">
              {(errors as FieldErrors<ReturnFormData>).unused?.message}
            </p>
          )}
        </div>
      )}

      {/* Complaint-specific: Defect Description - Sinsay Style */}
      {requestType === 'COMPLAINT' && (
        <div>
          <label className="block text-sm md:text-base font-medium mb-2 text-[#1E293B]">
            Defect Description *
          </label>
          <textarea
            {...register('defectDescription')}
            rows={4}
            className="w-full min-h-[120px] px-4 py-3 sinsay-input text-[#1E293B] placeholder:text-[#94A3B8] text-sm md:text-base resize-y"
            placeholder="Describe the defect in detail (minimum 10 characters)"
          />
          {(errors as FieldErrors<ComplaintFormData>).defectDescription && (
            <p className="text-[#DC2626] text-xs md:text-sm mt-1.5">
              {(errors as FieldErrors<ComplaintFormData>).defectDescription?.message}
            </p>
          )}
        </div>
      )}

      {/* Image Upload */}
      <div>
        <label className="block text-sm md:text-base font-medium mb-2 text-[#1E293B]">
          {requestType === 'RETURN' ? 'Receipt Image' : 'Defect Photos'} *
        </label>
        <FileUploader
          value={watchedImages || []}
          onChange={handleFileChange}
          onError={onError}
          error={errors.images?.message}
          multiple={true}
        />
      </div>

      {/* Submit Button - Sinsay Style */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sinsay-button-primary py-3 md:py-3.5 px-6 text-sm md:text-base font-medium"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}
