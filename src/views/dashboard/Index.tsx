'use client';
import { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../../components/layout';
import { MetricCard, QuickActions } from '../../components/overview';
import {
  Catalog, Category, Help, EventSchedule, Information, FolderOpen, Image, GroupPresentation, Email, Document, ListBoxes,
} from '@carbon/icons-react';
import { useGeneral } from '../../context/GeneralContext';
import analyticsService from '../../services/analytics.service';
import type { CandidatePortalStats } from '../../services/analytics.service';

const Dashboard = () => {
  const { user, acls, getAccessIds } = useGeneral();
  const [portalStats, setPortalStats] = useState<CandidatePortalStats | null>(null);

  const userRole = acls[0]?.Role?.name || 'Member';
  const generalModuleId = acls[0]?.module_unique_id;

  const portalIds = useMemo(() => getAccessIds('candidate-portal', 'candidate-portal-overview'), [acls]);

  useEffect(() => {
    if (!generalModuleId || !portalIds) return;

    let cancelled = false;

    analyticsService.getCandidatePortalStats({ module_unique_id: portalIds.module_unique_id, sub_module_unique_id: portalIds.sub_module_unique_id })
      .then(res => { if (!cancelled && res.success && res.data) setPortalStats(res.data); })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [generalModuleId, portalIds]);

  return (
    <div>
      <Navbar title="Dashboard" />

      <div className="xui-py-1-half">
        <div className="xui-mb-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
              Welcome back, {user?.fullname?.split(' ')[0] || 'Member'}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--neutral-500)', margin: '4px 0 0' }}>
              Here's an overview of your portal.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="dash-badge" style={{ background: 'var(--primary-100)', color: 'var(--primary-700)' }}>{userRole}</span>
          </div>
        </div>

        {portalStats && (
          <div className="xui-d-grid xui-grid-col-1 xui-md-grid-col-2 xui-lg-grid-col-4 xui-grid-gap-1 xui-mb-2">
            <MetricCard title="Announcements" value={portalStats.total_announcements} icon={<Catalog size={24} />} iconBgColor="var(--primary-100)" iconColor="var(--primary-700)" />
            <MetricCard title="Categories" value={portalStats.total_categories} icon={<Category size={24} />} iconBgColor="var(--info-light)" iconColor="var(--info)" />
            <MetricCard title="Members" value={portalStats.total_members ?? 0} icon={<GroupPresentation size={24} />} iconBgColor="var(--success-light)" iconColor="var(--success)" />
            <MetricCard title="Manifestos" value={portalStats.total_manifestos} icon={<ListBoxes size={24} />} iconBgColor="var(--warning-light)" iconColor="var(--warning)" />
            <MetricCard title="Posts" value={portalStats.total_posts} icon={<Document size={24} />} iconBgColor="#fce7f3" iconColor="#ed3337" />
            <MetricCard title="Events" value={portalStats.total_events} icon={<EventSchedule size={24} />} iconBgColor="var(--neutral-100)" iconColor="var(--neutral-600)" />
            <MetricCard title="Gallery" value={portalStats.total_galleries} icon={<Image size={24} />} iconBgColor="#f0fdf4" iconColor="#16a34a" />
            <MetricCard title="Newsletters" value={portalStats.total_newsletters} icon={<Email size={24} />} iconBgColor="#fff7ed" iconColor="#ea580c" />
            <MetricCard title="FAQs" value={portalStats.total_faqs} icon={<Information size={24} />} iconBgColor="#fdf2f8" iconColor="#9333ea" />
            <MetricCard title="Enquiries" value={portalStats.total_enquiries} icon={<Help size={24} />} iconBgColor="var(--neutral-100)" iconColor="var(--neutral-700)" />
            <MetricCard title="File Storage" value={portalStats.total_file_storage} icon={<FolderOpen size={24} />} iconBgColor="var(--primary-100)" iconColor="var(--primary-600)" />
          </div>
        )}

        <div className="xui-mb-2">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
