import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl" | "full" | "parent";
  color?: "primary" | "secondary" | "white" | "muted";
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "full",
  color = "primary",
  text,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
    full: "w-32 h-32",
    parent: "w-16 h-16",
  };

  const colorClasses = {
    primary: "border-blue-600",
    secondary: "border-gray-600",
    white: "border-white",
    muted: "border-gray-400",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-black fixed inset-0 w-screen h-screen ${className}`}
    >
      <div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-2 border-t-transparent 
          rounded-full 
          animate-spin
        `}
      />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
};

// Example usage component
// const LoadingSpinnerDemo = () => {
//   return (
//     <div className="p-8 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <h1 className="text-2xl font-bold text-center mb-8">
//         Loading Spinner Examples
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Different sizes */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">Sizes</h3>
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <LoadingSpinner size="sm" />
//               <span className="text-sm">Small</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <LoadingSpinner size="md" />
//               <span className="text-sm">Medium</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <LoadingSpinner size="lg" />
//               <span className="text-sm">Large</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <LoadingSpinner size="xl" />
//               <span className="text-sm">Extra Large</span>
//             </div>
//           </div>
//         </div>

//         {/* Different colors */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">Colors</h3>
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <LoadingSpinner color="primary" />
//               <span className="text-sm">Primary</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <LoadingSpinner color="secondary" />
//               <span className="text-sm">Secondary</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <LoadingSpinner color="muted" />
//               <span className="text-sm">Muted</span>
//             </div>
//             <div className="bg-gray-800 p-2 rounded">
//               <div className="flex items-center gap-4">
//                 <LoadingSpinner color="white" />
//                 <span className="text-sm text-white">White</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* With text */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">With Text</h3>
//           <div className="space-y-6">
//             <LoadingSpinner text="Loading..." />
//             <LoadingSpinner text="Please wait..." size="lg" />
//             <LoadingSpinner
//               text="Processing your request..."
//               color="secondary"
//             />
//           </div>
//         </div>

//         {/* Page loading overlay */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//           <h3 className="text-lg font-semibold mb-4">Full Page Overlay</h3>
//           <div className="relative h-32 bg-gray-100 dark:bg-gray-700 rounded">
//             <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
//               <LoadingSpinner
//                 size="lg"
//                 text="Loading page..."
//                 className="h-full"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Usage examples */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//         <h3 className="text-lg font-semibold mb-4">Common Usage Patterns</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Button loading */}
//           <div>
//             <h4 className="font-medium mb-2">Button Loading</h4>
//             <button
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//               disabled
//             >
//               <LoadingSpinner size="sm" color="white" />
//               Saving...
//             </button>
//           </div>

//           {/* Card loading */}
//           <div>
//             <h4 className="font-medium mb-2">Card Loading</h4>
//             <div className="border rounded-lg p-4 h-24 flex items-center justify-center">
//               <LoadingSpinner text="Loading content..." />
//             </div>
//           </div>

//           {/* Inline loading */}
//           <div>
//             <h4 className="font-medium mb-2">Inline Loading</h4>
//             <div className="flex items-center gap-2">
//               <LoadingSpinner size="sm" />
//               <span>Fetching data...</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default LoadingSpinner;
