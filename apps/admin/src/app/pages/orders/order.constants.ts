export interface Odrder {
  [key: number]: {
    label: string;
    color: string;
  };
}

export const ORDER_STATUS: Odrder = {
  0: {
    label: 'Pending',
    color: 'primary',
  },
  1: {
    label: 'Processed',
    color: 'warning',
  },
  2: {
    label: 'Shipped',
    color: 'warning',
  },
  3: {
    label: 'Delivered',
    color: 'success',
  },
  4: {
    label: 'Failed',
    color: 'danger',
  },
};
