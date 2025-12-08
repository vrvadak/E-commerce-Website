const mongoose = require('mongoose');

const userBehaviorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  actionType: {
    type: String,
    required: true,
    enum: ['view', 'cart_add', 'purchase', 'wishlist_add', 'search', 'review'],
    index: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports', 'Books', 'Other'],
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  metadata: {
    searchTerm: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    quantity: {
      type: Number,
      min: 1
    }
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
userBehaviorSchema.index({ user: 1, timestamp: -1 });
userBehaviorSchema.index({ product: 1, actionType: 1 });
userBehaviorSchema.index({ category: 1, actionType: 1 });

module.exports = mongoose.model('UserBehavior', userBehaviorSchema);