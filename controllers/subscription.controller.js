import subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";

const createSubscription = async (req, res) => {
  try {
    // Logic to create a subscription
    const {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      status,
      startDate,
      renewalDate,
    } = req.body;

    // Assuming Subscription is a Mongoose model
    const newSubscription = await subscription.create({
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      status,
      startDate,
      renewalDate,
      user: req.user._id, // Use authenticated user's ID from middleware
    });

    if (!newSubscription) {
      return res.status(500).json({ message: "Failed to create subscription" });
    }

    const relatedUser = await User.findById(req.user._id);
    newSubscription.user = relatedUser; // Associate user with the subscription
    // Respond with the created subscription
    res.status(201).json({
      title: "Subscription created successfully",
      data: {
        subscription: newSubscription,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(req.params);
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const subscriptions = await subscription.find({ user: userId });
    if (!subscriptions) {
      return res.status(404).json({ message: "No subscriptions found" });
    }
    res.status(200).json({
      title: "User subscriptions retrieved successfully",
      data: {
        subscriptions,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      status,
      startDate,
      renewalDate,
    } = req.body;
    const updatedSubscription = await subscription.findByIdAndUpdate(
      subscriptionId,
      {
        name,
        price,
        currency,
        frequency,
        category,
        paymentMethod,
        status,
        startDate,
        renewalDate,
      },
      { new: true }
    );
    if (!updatedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({
      title: "Subscription updated successfully",
      data: {
        subscription: updatedSubscription,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { createSubscription, getUserSubscriptions, updateSubscription };
