import React from "react";
import PropTypes from "prop-types";
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from "react-icons/fa";
function RepoItem({ repo }) {
  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
  } = repo;

  return (
    <div className="mb-2 rounded-md card bg-gray-800 hover:bg-gray-900">
      <div className="card-body">
        <h3 className="mb-2 text-xl font-semibold">
          <a href={html_url} target="_blank">
            <FaLink className="inline mr-2" />
            {name}
          </a>
        </h3>
        <p className="mb-2">{description}</p>
        <div className="flex">
          <div>
            <div className="mr-3 badge badge-info badge-lg">
              <FaEye className="mr-3" />
              {watchers_count}
            </div>
          </div>
          <div>
            <div className="mr-3 badge badge-success badge-lg">
              <FaStar className="mr-1" />
              {stargazers_count}
            </div>
          </div>
          <div>
            <div className="mr-3 badge badge-error badge-lg">
              <FaInfo className="mr-3" />
              {open_issues}
            </div>
          </div>
          <div>
            <div className="mr-3 badge badge-warning badge-lg">
              <FaUtensils className="mr-3" />
              {forks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};
export default RepoItem;
