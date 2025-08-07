'use client';

import { useState } from 'react';
import { Check, Crown, Zap } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: Zap,
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Get started with limited access',
      features: [
        'Limited content library',
        'SD quality streaming',
        'Single device streaming',
        'Ad-supported content',
        'Basic customer support',
      ],
      limitations: [
        'No offline downloads',
        'No premium content',
        'Limited viewing hours per month',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Crown,
      monthlyPrice: 549,
      yearlyPrice: 5490,
      description: 'Full access to all content',
      popular: true,
      features: [
        'Full content library access',
        '4K Ultra HD streaming',
        'Stream on up to 4 devices',
        'Ad-free experience',
        'Offline downloads',
        'Premium exclusive content',
        'Priority customer support',
        'Multiple user profiles',
      ],
      limitations: [],
    },
  ];

  const paymentMethods = [
    {
      id: 'gcash',
      name: 'GCash',
      description: 'Pay securely with GCash',
      logo: '💳',
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      logo: '🏦',
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return 'Free';
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return `₱${price.toLocaleString()}`;
  };

  const getPriceSubtext = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return 'Forever';
    return billingCycle === 'monthly' ? 'per month' : 'per year';
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0 || billingCycle === 'monthly') return null;
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.yearlyPrice;
    return `Save ₱${savings.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start with our free plan or upgrade to premium for unlimited access to all content
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly
                <Badge className="ml-2 bg-green-600 text-white">Save 17%</Badge>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              
              return (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-red-600 bg-red-600/5 shadow-2xl scale-105'
                      : 'border-gray-800 hover:border-gray-700'
                  } ${plan.popular ? 'md:scale-105' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="netflix-gradient">Most Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-gray-800">
                        <Icon className="h-8 w-8 text-red-500" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-white">
                        {getPrice(plan)}
                      </div>
                      <div className="text-gray-400">{getPriceSubtext(plan)}</div>
                      {getSavings(plan) && (
                        <div className="text-green-400 font-medium mt-1">
                          {getSavings(plan)}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-center">
                      <RadioGroup
                        value={selectedPlan}
                        onValueChange={setSelectedPlan}
                        className="flex"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={plan.id} id={plan.id} />
                          <Label htmlFor={plan.id} className="sr-only">
                            {plan.name}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Payment Methods */}
          {selectedPlan !== 'free' && (
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                Choose Payment Method
              </h3>
              <div className="grid gap-4 mb-8">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className="border-gray-800 hover:border-gray-700 transition-colors">
                    <CardContent className="flex items-center space-x-4 p-4">
                      <div className="text-2xl">{method.logo}</div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{method.name}</div>
                        <div className="text-gray-400 text-sm">{method.description}</div>
                      </div>
                      <RadioGroup defaultValue={method.id === 'gcash' ? method.id : ''}>
                        <RadioGroupItem value={method.id} id={method.id} />
                      </RadioGroup>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <Link href={selectedPlan === 'free' ? '/' : '/payment'}>
              <Button size="lg" className="netflix-gradient min-w-48">
                {selectedPlan === 'free' ? 'Start Free Plan' : 'Continue to Payment'}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}