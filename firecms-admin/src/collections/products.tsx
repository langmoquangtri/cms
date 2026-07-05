import {
    buildCollection,
    EntityReference,
  } from '@firecms/core';
  
  export type Product = {
    name: string;
    slug: string;
    sku: string;
  
    category?: EntityReference;
  
    main_image: string;
    images: string[];
  
    reference_price?: number;
    material: string;
    dimensions: string;
  
    short_description: string;
    content: string;
  
    status: 'draft' | 'published' | 'hidden';
    featured: boolean;
    sort_order: number;
  
    seo_title: string;
    seo_description: string;
  
    created_at: Date;
    updated_at: Date;
  };
  
  export const productsCollection = buildCollection<Product>({
    name: 'Sản phẩm',
    singularName: 'Sản phẩm',
    id: 'products',
    path: 'products',
    group: 'Nội dung website',
  
    permissions: () => ({
      read: true,
      edit: true,
      create: true,
      delete: true,
    }),
  
    properties: {
      name: {
        name: 'Tên sản phẩm',
        dataType: 'string',
        validation: {
          required: true,
        },
        columnWidth: 280,
      },
  
      slug: {
        name: 'Slug',
        dataType: 'string',
        description:
          'Đường dẫn URL. Ví dụ: lang-mo-da-xanh-thanh-hoa',
        validation: {
          required: true,
        },
        columnWidth: 250,
      },
  
      sku: {
        name: 'Mã sản phẩm',
        dataType: 'string',
        description: 'Ví dụ: LM001',
        columnWidth: 150,
      },
  
      category: {
        name: 'Danh mục',
        dataType: 'reference',
        path: 'categories',
        description: 'Chọn danh mục sản phẩm',
      },
  
      main_image: {
        name: 'Ảnh đại diện',
        dataType: 'string',
        storage: {
          storagePath: 'products/main',
          acceptedFiles: ['image/*'],
        },
      },
  
      images: {
        name: 'Thư viện ảnh',
        dataType: 'array',
        description: 'Tải lên nhiều ảnh của sản phẩm',
        of: {
          dataType: 'string',
          storage: {
            storagePath: 'products/gallery',
            acceptedFiles: ['image/*'],
          },
        },
      },
  
      reference_price: {
        name: 'Giá tham khảo',
        dataType: 'number',
        description:
          'Có thể để trống nếu sản phẩm báo giá theo yêu cầu',
        validation: {
          min: 0,
        },
      },
  
      material: {
        name: 'Chất liệu đá',
        dataType: 'string',
        description:
          'Ví dụ: Đá xanh Thanh Hóa, đá xanh rêu, granite...',
        columnWidth: 220,
      },
  
      dimensions: {
        name: 'Kích thước',
        dataType: 'string',
        description: 'Ví dụ: 81 × 127 cm',
        columnWidth: 180,
      },
  
      short_description: {
        name: 'Mô tả ngắn',
        dataType: 'string',
        multiline: true,
        columnWidth: 320,
      },
  
      content: {
        name: 'Nội dung chi tiết',
        dataType: 'string',
        markdown: true,
        description:
          'Nội dung chi tiết hiển thị trên trang sản phẩm',
      },
  
      status: {
        name: 'Trạng thái',
        dataType: 'string',
        validation: {
          required: true,
        },
        enumValues: {
          draft: 'Bản nháp',
          published: 'Đã xuất bản',
          hidden: 'Đã ẩn',
        },
        defaultValue: 'draft',
      },
  
      featured: {
        name: 'Sản phẩm nổi bật',
        dataType: 'boolean',
        defaultValue: false,
      },
  
      sort_order: {
        name: 'Thứ tự hiển thị',
        dataType: 'number',
        defaultValue: 0,
        validation: {
          min: 0,
        },
      },
  
      seo_title: {
        name: 'SEO Title',
        dataType: 'string',
        description: 'Tiêu đề hiển thị trên Google',
        columnWidth: 280,
      },
  
      seo_description: {
        name: 'SEO Description',
        dataType: 'string',
        multiline: true,
        description:
          'Mô tả ngắn dành cho công cụ tìm kiếm',
        columnWidth: 320,
      },
  
      created_at: {
        name: 'Ngày tạo',
        dataType: 'date',
        autoValue: 'on_create',
      },
  
      updated_at: {
        name: 'Cập nhật lần cuối',
        dataType: 'date',
        autoValue: 'on_update',
      },
    },
  });