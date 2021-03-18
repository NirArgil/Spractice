const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { user } =  require('../routes/api/users')
const mongoose = require('mongoose');
const express = require("express");



// @desc    Get all transactions
// @route   GET /api/transaction
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try { 
    const transactions = await Transaction.find(); 
    // { user: req.user.id }

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Public

exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);

    //try to referece to user but it doesnt create nothing.
    // transaction.user = req.user;

    // transaction = new Transaction({
    //   user,
    //   text,
    //   amount
    // });

    return res.status(201).json({
      success: true,
      data: transaction
    }); 
    
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}