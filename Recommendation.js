const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  recommendedProducts: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    score: {
      type: Number,
      default: 0
    },
    reason: {
      type: String,
      enum: ['similar_users', 'browsing_history', 'purchase_history', 'seasonal_trend']
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
recommendationSchema.index({ user: 1, lastUpdated: -1 });

module.exports = mongoose.model('Recommendation', recommendationSchema);