import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IntakeForm } from '../components/IntakeForm';

describe('IntakeForm', () => {
  it('renders the form with all required fields', () => {
    const onSubmit = vi.fn();
    render(<IntakeForm onSubmit={onSubmit} />);

    expect(screen.getByText('Verification Request')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. PL-123456')).toBeInTheDocument();
    expect(screen.getByText('Standard Return')).toBeInTheDocument();
    expect(screen.getByText('Complaint (Reklamacja)')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Describe the issue or reason for return...'),
    ).toBeInTheDocument();
  });

  it('shows validation error for short order ID', async () => {
    const onSubmit = vi.fn();
    render(<IntakeForm onSubmit={onSubmit} />);

    const orderInput = screen.getByPlaceholderText('e.g. PL-123456');
    const descInput = screen.getByPlaceholderText(
      'Describe the issue or reason for return...',
    );
    const submitBtn = screen.getByText('Proceed to Verification');

    fireEvent.change(orderInput, { target: { value: 'ABC' } });
    fireEvent.change(descInput, {
      target: { value: 'This is a long description' },
    });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText('Order ID must be at least 5 chars'),
      ).toBeInTheDocument();
    });
  });

  it('shows validation error for short description', async () => {
    const onSubmit = vi.fn();
    render(<IntakeForm onSubmit={onSubmit} />);

    const orderInput = screen.getByPlaceholderText('e.g. PL-123456');
    const descInput = screen.getByPlaceholderText(
      'Describe the issue or reason for return...',
    );
    const submitBtn = screen.getByText('Proceed to Verification');

    fireEvent.change(orderInput, { target: { value: 'PL-12345' } });
    fireEvent.change(descInput, { target: { value: 'Short' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Please describe the issue')).toBeInTheDocument();
    });
  });
});
