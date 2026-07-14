function LoadingSkeleton() {
  return (
    <div className="animate-pulse">

      <div className="h-10 w-52 rounded bg-gray-300 mb-8"></div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[1,2,3,4].map((i)=>(
          <div
            key={i}
            className="h-40 rounded-2xl bg-gray-300"
          />
        ))}

      </div>

    </div>
  );
}

export default LoadingSkeleton;