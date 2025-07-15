import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription name is required"],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0,
    max: 1000000, // Assuming a maximum price limit
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "GBP", "INR", "JPY"], // Add more currencies as needed
    required: [true, "Currency is required"],
    default: "USD",
  },
  frequency: {
    type: String,
    enum: ["monthly", "yearly", "weekly", "daily"],
  },
  category: {
    type: String,
    enum: [
      "entertainment",
      "utilities",
      "politics",
      "lifestyle",
      "other",
      "sports",
    ],
    required: [true, "Category is required"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Payment method is required"],
    trim: true,
  },

  status: {
    type: String,
    enum: ["active", "inactive", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
    validate: {
      validator: (value) => value <= new Date(),
      message: "Start date cannot be in the future",
    },
  },
  renewalDate: {
    type: Date,
    required: [true, "Renewal date is required"],
    validate: {
      validator: function (value) {
        value > this.startDate;
      },
      message: "Renewal date cannot be in the future",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    index: true, // For faster lookups
  },
});
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      monthly: 30,
      yearly: 365,
      weekly: 7,
      daily: 1,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const subscription = mongoose.model("Subscription", subscriptionSchema);

export default subscription;
