import { Schema, model } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      require: true,
      default: 'personal',
    },
    parentId: { type: Schema.Types.ObjectId, ref: 'users' }, // нова властивість
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contact', contactsSchema);
