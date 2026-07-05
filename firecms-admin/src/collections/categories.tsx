import { buildCollection } from '@firecms/core';

export type Category = {
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
  sort_order: number;
};

export const categoriesCollection = buildCollection<Category>({
  name: 'Danh mục',
  singularName: 'Danh mục',
  id: 'categories',
  path: 'categories',
  group: 'Nội dung website',

  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),

  properties: {
    name: {
      name: 'Tên danh mục',
      dataType: 'string',
      validation: {
        required: true,
      },
      columnWidth: 250,
    },

    slug: {
      name: 'Slug',
      dataType: 'string',
      description: 'Ví dụ: lang-mo-da',
      validation: {
        required: true,
      },
    },

    description: {
      name: 'Mô tả',
      dataType: 'string',
      multiline: true,
      columnWidth: 300,
    },

    image: {
      name: 'Ảnh đại diện',
      dataType: 'string',
      storage: {
        storagePath: 'categories',
        acceptedFiles: ['image/*'],
      },
    },

    active: {
      name: 'Hiển thị',
      dataType: 'boolean',
      defaultValue: true,
    },

    sort_order: {
      name: 'Thứ tự hiển thị',
      dataType: 'number',
      defaultValue: 0,
      validation: {
        min: 0,
      },
    },
  },
});
