import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  MoreHorizontal, 
  Share2, 
  Tag, 
  Search,
  HardDrive,
  Cloud,
  Monitor,
  FileText,
  Users,
  Folder as FolderIcon,
  AppWindow as AppWindowIcon,
  BookOpen
} from 'lucide-react';

interface FinderAppProps {
  onOpenApp: (appId: string, extraProps?: Record<string, any>) => void;
}

interface FinderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  kind: 'resume' | 'projects_md' | 'project' | 'app' | 'generic';
  iconType: 'blue_folder' | 'app_folder' | 'doc_file' | 'library_folder' | 'system_folder' | 'book';
  projectId?: string;
}

export const FinderApp: React.FC<FinderAppProps> = ({ onOpenApp }) => {
  const [selectedFolder, setSelectedFolder] = useState<string>("Subham's Mac");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Subham's Mac directory items matching reference screenshot layout
  const finderItems: FinderItem[] = [
    {
      id: 'resume_file',
      name: 'resume',
      type: 'file',
      kind: 'resume',
      iconType: 'doc_file',
    },
    {
      id: 'projects_md_file',
      name: 'projects.md',
      type: 'file',
      kind: 'projects_md',
      iconType: 'doc_file',
    },
    {
      id: 'applications_folder',
      name: 'Applications',
      type: 'folder',
      kind: 'generic',
      iconType: 'app_folder',
    },
    {
      id: 'payflow_folder',
      name: 'PayFlow',
      type: 'folder',
      kind: 'project',
      iconType: 'blue_folder',
      projectId: 'payflow',
    },
    {
      id: 'resumepilot_folder',
      name: 'ResumePilot',
      type: 'folder',
      kind: 'project',
      iconType: 'blue_folder',
      projectId: 'resumepilot',
    },
    {
      id: 'foodrush_folder',
      name: 'FoodRush',
      type: 'folder',
      kind: 'project',
      iconType: 'blue_folder',
      projectId: 'foodrush',
    },
    {
      id: 'chessplus_folder',
      name: 'Chess++',
      type: 'folder',
      kind: 'project',
      iconType: 'blue_folder',
      projectId: 'chessplus',
    },
    {
      id: 'library_folder',
      name: 'Library',
      type: 'folder',
      kind: 'generic',
      iconType: 'library_folder',
    },
    {
      id: 'system_folder',
      name: 'System',
      type: 'folder',
      kind: 'generic',
      iconType: 'system_folder',
    },
    {
      id: 'contacts_book',
      name: 'Contacts',
      type: 'file',
      kind: 'generic',
      iconType: 'book',
    },
  ];

  const handleItemDoubleClick = (item: FinderItem) => {
    if (item.kind === 'resume') {
      onOpenApp('whoami');
    } else if (item.kind === 'projects_md') {
      onOpenApp('project');
    } else if (item.kind === 'project' && item.projectId) {
      onOpenApp('project', { projectId: item.projectId });
    } else if (item.name === 'Applications' || item.name === 'Library' || item.name === 'System') {
      onOpenApp('project');
    } else if (item.name === 'Contacts') {
      onOpenApp('whoami');
    }
  };

  const filteredItems = finderItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItemIcon = (iconType: FinderItem['iconType']) => {
    switch (iconType) {
      case 'doc_file':
        return (
          <div className="w-12 h-14 bg-gradient-to-b from-stone-100 to-stone-200 border border-stone-300 rounded-md shadow-md flex flex-col items-center justify-between p-1.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-3 h-3 bg-stone-300 rounded-bl-sm" />
            <FileText className="w-6 h-6 text-stone-500 mt-2" />
            <div className="w-full space-y-0.5 mb-1">
              <div className="h-0.5 bg-stone-400 rounded-full w-3/4 mx-auto" />
              <div className="h-0.5 bg-stone-400 rounded-full w-1/2 mx-auto" />
            </div>
          </div>
        );
      case 'app_folder':
        return (
          <div className="w-14 h-11 bg-gradient-to-b from-[#60C3FF] to-[#0A84FF] rounded-lg shadow-md flex items-center justify-center relative border border-sky-300/60">
            <div className="absolute -top-1.5 left-1.5 w-6 h-2 bg-[#60C3FF] rounded-t-sm" />
            <AppWindowIcon className="w-6 h-6 text-white drop-shadow-sm" />
          </div>
        );
      case 'library_folder':
        return (
          <div className="w-14 h-11 bg-gradient-to-b from-[#60C3FF] to-[#0A84FF] rounded-lg shadow-md flex items-center justify-center relative border border-sky-300/60">
            <div className="absolute -top-1.5 left-1.5 w-6 h-2 bg-[#60C3FF] rounded-t-sm" />
            <BookOpen className="w-5 h-5 text-white drop-shadow-sm" />
          </div>
        );
      case 'system_folder':
        return (
          <div className="w-14 h-11 bg-gradient-to-b from-[#40A5FF] to-[#0066CC] rounded-lg shadow-md flex items-center justify-center relative border border-sky-300/60">
            <div className="absolute -top-1.5 left-1.5 w-6 h-2 bg-[#40A5FF] rounded-t-sm" />
            <span className="text-[9px] font-bold text-white tracking-tighter">macOS</span>
          </div>
        );
      case 'book':
        return (
          <div className="w-12 h-14 bg-gradient-to-b from-slate-600 to-slate-800 rounded-md shadow-md flex flex-col items-center justify-center p-1 border border-slate-500">
            <Users className="w-6 h-6 text-sky-200" />
          </div>
        );
      case 'blue_folder':
      default:
        return (
          <div className="w-14 h-11 bg-gradient-to-b from-[#64C8FF] via-[#33A9FF] to-[#0088FF] rounded-lg shadow-md flex items-center justify-center relative border border-sky-200/60">
            <div className="absolute -top-1.5 left-1.5 w-6 h-2 bg-[#64C8FF] rounded-t-sm" />
            <FolderIcon className="w-5 h-5 text-white/90 fill-white/20" />
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full flex bg-white text-stone-800 select-none overflow-hidden font-sans">
      {/* Left Sidebar (Light Warm macOS Translucent Grey) */}
      <div className="w-48 bg-[#ECEAE5] border-r border-stone-300 flex flex-col justify-between py-3 px-2 shrink-0">
        <div className="space-y-4">
          {/* iCloud Section */}
          <div className="space-y-1">
            <div className="px-2 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              iCloud
            </div>
            <button 
              onClick={() => setSelectedFolder('iCloud Drive')}
              className={`w-full flex items-center space-x-2 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedFolder === 'iCloud Drive' ? 'bg-[#007AFF] text-white' : 'hover:bg-stone-300/50 text-stone-700'
              }`}
            >
              <Cloud className="w-4 h-4 opacity-90" />
              <span>iCloud Drive</span>
            </button>
            <button 
              onClick={() => setSelectedFolder('Desktop')}
              className={`w-full flex items-center space-x-2 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedFolder === 'Desktop' ? 'bg-[#007AFF] text-white' : 'hover:bg-stone-300/50 text-stone-700'
              }`}
            >
              <Monitor className="w-4 h-4 opacity-90" />
              <span>Desktop</span>
            </button>
            <button 
              onClick={() => setSelectedFolder('Documents')}
              className={`w-full flex items-center space-x-2 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedFolder === 'Documents' ? 'bg-[#007AFF] text-white' : 'hover:bg-stone-300/50 text-stone-700'
              }`}
            >
              <FileText className="w-4 h-4 opacity-90" />
              <span>Documents</span>
            </button>
            <button 
              onClick={() => setSelectedFolder('Shared')}
              className={`w-full flex items-center space-x-2 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedFolder === 'Shared' ? 'bg-[#007AFF] text-white' : 'hover:bg-stone-300/50 text-stone-700'
              }`}
            >
              <Users className="w-4 h-4 opacity-90" />
              <span>Shared</span>
            </button>
          </div>

          {/* Locations Section */}
          <div className="space-y-1">
            <div className="px-2 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Locations
            </div>
            <button 
              onClick={() => setSelectedFolder("Subham's Mac")}
              className={`w-full flex items-center space-x-2 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedFolder === "Subham's Mac" ? 'bg-[#007AFF] text-white' : 'hover:bg-stone-300/50 text-stone-700'
              }`}
            >
              <HardDrive className="w-4 h-4 opacity-90" />
              <span>Subham's Mac</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-2 text-[10px] text-stone-500">
          Subham's macOS Finder
        </div>
      </div>

      {/* Right Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {/* Top Finder Toolbar Header */}
        <div className="h-11 border-b border-stone-200 flex items-center justify-between px-3 bg-[#F6F6F6] shrink-0">
          {/* Left Navigation controls & Folder Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-stone-500">
              <button className="p-1 hover:bg-stone-200 rounded text-stone-600 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 hover:bg-stone-200 rounded text-stone-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span className="font-bold text-sm text-stone-800 tracking-tight">
              {selectedFolder}
            </span>
          </div>

          {/* Right Toolbar Actions */}
          <div className="flex items-center space-x-2 text-stone-600">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-stone-200/80 p-0.5 rounded-md border border-stone-300">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500 hover:text-stone-800'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500 hover:text-stone-800'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            <button className="p-1 hover:bg-stone-200 rounded text-stone-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-stone-200 rounded text-stone-600">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-stone-200 rounded text-stone-600">
              <Tag className="w-4 h-4" />
            </button>

            {/* Search Bar */}
            <div className="relative flex items-center ml-2">
              <Search className="w-3.5 h-3.5 absolute left-2 text-stone-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-7 pr-2 py-0.5 w-32 bg-stone-200/60 border border-stone-300 rounded-md text-xs focus:outline-none focus:bg-white focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Folder Content Grid View */}
        <div 
          onClick={() => setSelectedItemId(null)}
          className="flex-1 p-6 overflow-y-auto bg-white select-none"
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6 items-start">
              {filteredItems.map(item => {
                const isSelected = selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemId(item.id);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleItemDoubleClick(item);
                    }}
                    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#007AFF]/15 ring-1 ring-[#007AFF]' 
                        : 'hover:bg-stone-100'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-center">
                      {renderItemIcon(item.iconType)}
                    </div>
                    <span 
                      className={`text-xs text-center font-medium truncate max-w-full px-1.5 py-0.5 rounded ${
                        isSelected 
                          ? 'bg-[#007AFF] text-white font-semibold' 
                          : 'text-stone-700'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="divide-y divide-stone-100 text-xs">
              <div className="grid grid-cols-12 py-1 px-3 text-stone-400 font-semibold text-[11px] uppercase">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Kind</div>
                <div className="col-span-3">Size</div>
              </div>
              {filteredItems.map(item => {
                const isSelected = selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemId(item.id);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleItemDoubleClick(item);
                    }}
                    className={`grid grid-cols-12 py-1.5 px-3 items-center cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#007AFF] text-white' : 'hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div className="col-span-6 flex items-center space-x-2 font-medium">
                      <FolderIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-sky-500'}`} />
                      <span>{item.name}</span>
                    </div>
                    <div className={`col-span-3 capitalize ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                      {item.type}
                    </div>
                    <div className={`col-span-3 ${isSelected ? 'text-white/80' : 'text-stone-500'}`}>
                      --
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
