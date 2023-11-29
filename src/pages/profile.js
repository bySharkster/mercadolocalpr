import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Profile() {
    return (
      <div className="bg-[#E1EFE6] h-auto">
        <div className="p-10">
          <div className="bg-black rounded-lg h-[12rem]">
            <div className="relative flex justify-center items-center w-24 h-24 bg-black border-2 border-black rounded-full top-[9rem] left-32">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
          <div className="grid pl-52 m-10 text-black font-semibold">
            <div>
              @Username
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
          <Tabs>
            <TabList>
              <Tab>Job Posting</Tab>
              <Tab>Listed items</Tab>
              <Tab>Edit profile</Tab>
            </TabList>

            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
                <div className='flex'>
                  <div className='grid w-1/6 gap-4 justify-center'>
                    <div className='flex gap-5'>
                      <span>Tech</span>
                      <input type="checkbox" checked="checked" className="checkbox" />
                    </div>
                    <div className='flex gap-5'>
                      <span>Tech</span>
                      <input type="checkbox" checked="checked" className="checkbox" />
                    </div>
                    <div className='flex gap-5'>
                      <span>Tech</span>
                      <input type="checkbox" checked="checked" className="checkbox" />
                    </div>
                    <div className='flex gap-5'>
                      <span>Tech</span>
                      <input type="checkbox" checked="checked" className="checkbox" />
                    </div>
                  </div>
                  <div className='grid grid-cols-6 w-5/6 rounded-md bg-white gap-2 p-4'>
                    <div className="bg-white border border-gray-400 rounded-md"></div>
                    <div className="bg-white border border-gray-400 rounded-md"></div>
                    <div className="bg-white border border-gray-400 rounded-md"></div>
                    <div className="bg-white border border-gray-400 rounded-md"></div>
                    <div className="bg-white border border-gray-400 rounded-md"></div>
                    <div className="bg-white border border-gray-400 rounded-md"></div>
                  </div>
                </div>
            </TabPanel>
            <TabPanel>
              <div className='grid gap-3 m-10 max-w-md'>
                <input className='bg-white p-2 rounded-md' placeholder='name'/>
                <input className='bg-white p-2 rounded-md' placeholder='description'/>
                <div className='flex gap-2'>
                  <div className='bg-white rounded-md h-32 w-32 p-2 grid'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className='text-xs'>
                      change profile image
                    </span>
                  </div>
                  <div className='bg-white rounded-md h-32 w-32 p-2 grid'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className='text-xs'>
                      change Banner
                    </span>
                  </div>
                </div>
                <input className='bg-white p-2 rounded-md' placeholder='phone number'/>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
}