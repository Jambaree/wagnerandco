import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import ImgFallback from './ImgFallback'
import LinkDuo from './LinkDuo'
import { H4 } from '../components/Headings'
import DoodleRandomCorner from '../components/DoodleRandomCorner'

const TeamMembers = (props) => {
  const { members } = props
  return (
    <ul className="TeamMembers list-style-none m0 p0 sm-flex flex-wrap sm-mxn2 md-mb3 lg-mb4">
      {members.map((member, index) => {
        if (!member) {
          return null
        }

        return (
          <li
            key={`TeamMember_${member.name}_${index}`}
            className="TeamMembers-item col-12 sm-col-6 md-col-4 mb4 md-mb0">
            <div className={`sm-px2 lg-px4`}>
              {member.image ? (
                <div className="col-12 relative">
                  {(index + 1) % 2 === 0 ? (
                    <DoodleRandomCorner color="blue" />
                  ) : null}
                  <Image
                    src={member?.image?.url}
                    alt={member.image.alt || `Profile photo of ${member.name}`}
                    width={member?.image?.width}
                    height={member?.image?.height}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              ) : (
                <ImgFallback />
              )}
              <h4 className="h4 line-heigh-3 mb2">{member.name}</h4>
              <div className="h5">
                <H4 is="div" fontSize="inherit" track={1}>
                  {member.role}
                </H4>
                <div>{member.location}</div>
                {member.links && member.links.length >= 1 ? (
                  <ul className="m0 mb2 p0 list-style-none">
                    {member.links.map((linkObj, index) => {
                      let keyStr = `TeamMember_Link_${index}`

                      if (!linkObj || !linkObj.link) {
                        return null
                      }

                      return (
                        <li key={keyStr}>
                          <LinkDuo
                            to={linkObj.link.url}
                            target={linkObj.link.target}>
                            {linkObj.link.title}
                          </LinkDuo>
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

TeamMembers.propTypes = {
  members: PropTypes.array.isRequired,
}

TeamMembers.defaultProps = {
  members: [],
}

export default TeamMembers
