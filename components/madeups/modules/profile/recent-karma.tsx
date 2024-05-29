import React from "react";
import KarmaRecent from "@/public/assets/svgs/karma-recent";
import moment from "moment";

type Props = {
  data: {
    point: number;
    created_at: string;
    title: string;
  }[];
};

const RecentKarma = (props: Props) => {
  // console.log(props.data);

  return (
    <>
      <div className="p-0">
        <h2>Recent Activities</h2>
      </div>
      <div className="flex flex-col gap-3">
        {props.data.map((data, i) => {
          return (
            <div key={i} className="flex flex-row gap-4 mt-4">
              <div className="flex items-center justify-center h-12 w-12 bg-custom-gradient rounded-full text-[#3B5998] text-3xl leading-none">
                <KarmaRecent />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="text-blue-600 font-semibold">
                    {data.point} Karma
                  </span>{" "}
                  awarded for {data.title}.
                </p>
                <p className="text-sm text-gray-400">
                  {" "}
                  {moment
                    .utc(data.created_at)
                    .local()
                    .startOf("seconds")
                    .fromNow()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentKarma;
