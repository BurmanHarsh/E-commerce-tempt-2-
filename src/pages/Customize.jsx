import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Palette, Shirt, Scissors, Check, ChevronRight, ChevronLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Fabric", icon: Palette },
  { id: 2, name: "Style", icon: Shirt },
  { id: 3, name: "Details", icon: Scissors },
  { id: 4, name: "Preview", icon: Eye },
];

const fabrics = [
  { id: "cotton", name: "Premium Cotton", price: 0, color: "#F5F5DC" },
  { id: "linen", name: "Italian Linen", price: 500, color: "#E8DCC4" },
  { id: "silk", name: "Mulberry Silk", price: 1500, color: "#F0E6D2" },
  { id: "wool", name: "Merino Wool", price: 1200, color: "#D1C4B0" },
];

const styles = [
  { id: "slim", name: "Slim Fit", description: "Modern tailored silhouette" },
  { id: "regular", name: "Regular Fit", description: "Classic comfortable cut" },
  { id: "relaxed", name: "Relaxed Fit", description: "Easy, laid-back style" },
];

const collars = [
  { id: "classic", name: "Classic Collar" },
  { id: "mandarin", name: "Mandarin Collar" },
  { id: "button-down", name: "Button Down" },
  { id: "spread", name: "Spread Collar" },
];

const sleeves = [
  { id: "long", name: "Long Sleeve" },
  { id: "short", name: "Short Sleeve" },
  { id: "roll-up", name: "Roll-Up Sleeve" },
];

const colors = [
  "#FFFFFF", "#000000", "#1E3A5F", "#8B4513", 
  "#228B22", "#8B0000", "#4B0082", "#2F4F4F"
];

export default function Customize() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    fabric: "cotton",
    style: "regular",
    collar: "classic",
    sleeve: "long",
    color: "#1E3A5F"
  });

  const basePrice = 1999;
  const fabricPrice = fabrics.find(f => f.id === selections.fabric)?.price || 0;
  const totalPrice = basePrice + fabricPrice;

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleAddToCart = () => {
    toast.success("Custom design saved!", {
      description: "This feature will be fully available soon.",
      position: "top-center"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            CUSTOM BUILDER
          </span>
          <h1 className="text-3xl md:text-5xl font-black">
            Build Your <span className="text-gradient">Perfect Shirt</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Design your custom shirt step by step. Choose fabric, style, and details to create something unique.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    currentStep === step.id
                      ? "gradient-primary text-white"
                      : currentStep > step.id
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                  <span className="hidden md:inline font-medium">{step.name}</span>
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Options Panel */}
          <div>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Fabric */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Choose Your Fabric</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {fabrics.map((fabric) => (
                      <Card
                        key={fabric.id}
                        className={`cursor-pointer transition-all hover:shadow-hover ${
                          selections.fabric === fabric.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelections({ ...selections, fabric: fabric.id })}
                      >
                        <CardContent className="p-4">
                          <div 
                            className="w-full aspect-square rounded-xl mb-3"
                            style={{ backgroundColor: fabric.color }}
                          />
                          <h3 className="font-semibold">{fabric.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {fabric.price === 0 ? "Included" : `+₹${fabric.price}`}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Style */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Select Your Fit</h2>
                  <div className="space-y-4">
                    {styles.map((style) => (
                      <Card
                        key={style.id}
                        className={`cursor-pointer transition-all hover:shadow-hover ${
                          selections.style === style.id ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => setSelections({ ...selections, style: style.id })}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selections.style === style.id ? "gradient-primary" : "bg-secondary"
                          }`}>
                            <Shirt className={`w-6 h-6 ${selections.style === style.id ? "text-white" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{style.name}</h3>
                            <p className="text-sm text-muted-foreground">{style.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Details */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Collar Style</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {collars.map((collar) => (
                        <Button
                          key={collar.id}
                          variant={selections.collar === collar.id ? "default" : "outline"}
                          className={selections.collar === collar.id ? "gradient-primary text-white" : ""}
                          onClick={() => setSelections({ ...selections, collar: collar.id })}
                        >
                          {collar.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-6">Sleeve Length</h2>
                    <div className="flex flex-wrap gap-3">
                      {sleeves.map((sleeve) => (
                        <Button
                          key={sleeve.id}
                          variant={selections.sleeve === sleeve.id ? "default" : "outline"}
                          className={selections.sleeve === sleeve.id ? "gradient-primary text-white" : ""}
                          onClick={() => setSelections({ ...selections, sleeve: sleeve.id })}
                        >
                          {sleeve.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-6">Color</h2>
                    <div className="flex flex-wrap gap-3">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`w-12 h-12 rounded-full border-4 transition-all ${
                            selections.color === color ? "border-primary scale-110" : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelections({ ...selections, color })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Preview */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Your Custom Design</h2>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fabric</span>
                        <span className="font-medium">{fabrics.find(f => f.id === selections.fabric)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fit</span>
                        <span className="font-medium">{styles.find(s => s.id === selections.style)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Collar</span>
                        <span className="font-medium">{collars.find(c => c.id === selections.collar)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sleeves</span>
                        <span className="font-medium">{sleeves.find(s => s.id === selections.sleeve)?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Color</span>
                        <div 
                          className="w-8 h-8 rounded-full border"
                          style={{ backgroundColor: selections.color }}
                        />
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Price</span>
                          <span className="text-gradient">₹{totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>

            {/* Navigation */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep} className="flex-1">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              {currentStep < 4 ? (
                <Button onClick={nextStep} className="flex-1 gradient-primary text-white">
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleAddToCart} className="flex-1 gradient-primary text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="order-first md:order-last">
            <div className="sticky top-24">
              <div 
                className="aspect-square rounded-3xl shadow-hover flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: selections.color + "20" }}
              >
                <div 
                  className="w-48 h-64 rounded-t-[60%] relative"
                  style={{ backgroundColor: selections.color }}
                >
                  {/* Collar indicator */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 rounded-b-full bg-white/30" />
                  {/* Buttons */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-white/50" />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl p-3">
                  <p className="text-sm font-semibold">Custom Shirt</p>
                  <p className="text-lg font-bold text-gradient">₹{totalPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
